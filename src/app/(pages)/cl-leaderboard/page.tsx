'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronsRight,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  Loader2,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Cinzel } from 'next/font/google';
import Image from 'next/image';
import { clsx } from 'clsx';
import { getLeaderboardData } from '@/app/server/cl-leaderboard';

interface IleaderBoardData {
  id: number;
  name: string;
  points: number;
  rank: number;
}

const cinzel = Cinzel({
  subsets: ['latin'],
});

const LeaderBoard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterRank, setFilterRank] = useState('all');
  const [data, setData] = useState<IleaderBoardData[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLeaderboardData();
        if (response.status !== 'success') throw new Error('Failed to fetch');
        const leaderboardData = JSON.parse(response.data);
        setData(
          leaderboardData
            .sort((a: IleaderBoardData, b: IleaderBoardData) => b.points - a.points)
            .map((item: IleaderBoardData, index: number) => ({ ...item, rank: index + 1 }))
        );
        setShowLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setShowLoading(true);
        setTimeout(() => {
          fetchData();
        }, 5000);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedData = useMemo(() => {
    return data
      .filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRank =
          filterRank === 'all' ||
          (filterRank === 'top5' && item.rank <= 5) ||
          (filterRank === 'others' && item.rank > 5);
        return matchesSearch && matchesRank;
      })
      .sort((a, b) => {
        const sortVal = sortOrder === 'desc' ? -1 : 1;
        return (a.points - b.points) * sortVal;
      });
  }, [searchQuery, sortOrder, filterRank, data]);

  const topPlayers = data.slice(0, 5);
  const pageCount = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const currentData = filteredAndSortedData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const getBarHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return 'h-[300px] md:h-[408px] sm:h-[300px]';
      case 2:
        return 'h-[250px] md:h-[344px] sm:h-[250px]';
      case 3:
        return 'h-[200px] md:h-[232px] sm:h-[200px]';
      case 4:
        return 'h-[150px] md:h-[136px] sm:h-[150px]';
      case 5:
        return 'h-[100px] md:h-[72px] sm:h-[100px]';
      default:
        return 'h-40';
    }
  };

  const podiumOrder = [4, 3, 1, 2, 5];

  const getRankIcon = (rank: number) => {
    const iconClasses = 'w-10 h-10 md:w-14 md:h-14 sm:w-10 sm:h-10 mx-auto';

    if (rank === 1)
      return (
        <div className="pt-12 sm:pt-8">
          <Image alt="crown" src="/assets/cl-leaderboard/crown.png" className={iconClasses} width={100} height={100} />
        </div>
      );
    if (rank === 2)
      return (
        <div className="pt-12 sm:pt-8">
          <Image alt="laurelwreath" src="/assets/cl-leaderboard/laurelwreath.png" className={iconClasses} width={100} height={100} />
        </div>
      );
    if (rank === 3)
      return (
        <div className="pt-12 sm:pt-8">
          <Image alt="trophy" src="/assets/cl-leaderboard/trophy.png" className={iconClasses} width={100} height={100} />
        </div>
      );

    return null;
  };

  return (
    <div className="min-h-[100dvh] w-full relative">
      {showLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#000545]/90 p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-md mx-4">
            <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
          </div>
        </div>
      )}
      <div className="fixed inset-0 bg-cover bg-top bg-no-repeat" style={{backgroundImage:"url('/assets/cl-leaderboard/cl_bg.png')"}}/>
      <div className="fixed inset-0 bg-gradient-to-b from-[#896D35] to-transparent opacity-60 mix-blend-overlay" />
      <div className="relative z-10 w-full py-8 px-4">
        <div className={`${cinzel.className} max-w-7xl mx-auto`}>
          <h1 className="text-white text-center my-16 md:my-24 tracking-wide font-[549] text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-nowrap">
            CL LEADERBOARD
          </h1>

          <div className="relative mb-16 md:mb-24">
            <div className="grid grid-cols-5 gap-3 sm:gap-7 lg:gap-8 h-full relative px-2 sm:px-4">
              {podiumOrder.map((position, index) => {
                const player = topPlayers.find((p) => p.rank === position);
                if (!player) return <div key={index}></div>;

                return (
                  <div key={index} className="relative flex flex-col items-center justify-end h-full">
                    <div className="w-full relative">
                      <div
                        className={clsx(
                          'w-full rounded-t-xl  md:rounded-t-2xl lg:rounded-t-3xl transition-all duration-300',
                          getBarHeight(player.rank),
                          position === 1 || position === 4 || position === 5
                            ? 'bg-gradient-to-b from-[#F6CE87] via-[#F6CE87f4] to-transparent'
                            : 'bg-gradient-to-b from-[#896D34] via-[#896D34f4] to-transparent'
                        )}
                      >
                        {getRankIcon(player.rank)}
                      </div>

                      <div className="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2">
                        <p className="text-white font-bold text-base sm:text-xl md:text-2xl text-center whitespace-nowrap">
                          {player.name.split(' ')[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-8 items-center justify-center">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-4 h-4" />
              <Input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white pl-10 w-full md:w-[50ch] rounded-full"
              />
            </div>

            <Select value={filterRank} onValueChange={setFilterRank}>
              <SelectTrigger className="w-full md:w-fit bg-white text-black rounded-full">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Players</SelectItem>
                <SelectItem value="top5">Top 5</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto bg-white text-black rounded-full">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOrder('desc')}>Highest Points</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder('asc')}>Lowest Points</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2 mb-8 font-[510]">
            <div className="flex justify-between text-white bg-[#070707B2] py-2 rounded-full text-sm px-4 sm:px-8 mb-2">
              <span>NAME</span>
              <span>POINTS</span>
            </div>
            {currentData.map((item, index) => (
              <div
                key={item.id}
                className={`flex justify-between items-center px-4 sm:px-8 py-4 rounded-2xl transition-colors 
                  ${index % 2 === 0 ? 'bg-[#70531DB2]' : 'bg-[#F4CC86CC]'}
              `}
              >
                <span className="text-white text-sm sm:text-base">{item.name}</span>
                <span className="text-white text-sm sm:text-base">{item.points}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-1 sm:gap-2 p-4 bg-[#896D35]/50 w-fit mx-auto rounded-xl">
            <Button
              variant="ghost"
              className="text-white text-xl disabled:opacity-50 rounded-full h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </Button>

            <Button
              variant="ghost"
              className="text-white text-xl disabled:opacity-50 rounded-full h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </Button>

            {(() => {
              const pages = [];

              pages.push(
                <Button
                  key={1}
                  variant={currentPage === 1 ? 'default' : 'ghost'}
                  className={`w-8 h-8 sm:w-12 sm:h-12 p-0 rounded-full text-base sm:text-xl ${
                    currentPage === 1 ? 'bg-[#896D35]' : 'text-white'
                  }`}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </Button>
              );

              if (currentPage <= 3) {
                for (let i = 2; i <= Math.min(3, pageCount); i++) {
                  pages.push(
                    <Button
                      key={i}
                      variant={currentPage === i ? 'default' : 'ghost'}
                      className={`w-8 h-8 sm:w-12 sm:h-12 p-0 rounded-full text-base sm:text-xl ${
                        currentPage === i ? 'bg-[#896D35]' : 'text-white'
                      }`}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </Button>
                  );
                }

                if (pageCount > 3) {
                  pages.push(
                    <span key="ellipsis" className="text-white mx-1">
                      ...
                    </span>
                  );
                }
              }

              else if (currentPage >= pageCount - 2) {
                pages.push(
                  <span key="ellipsis" className="text-white mx-1">
                    ...
                  </span>
                );

                for (let i = Math.max(2, pageCount - 2); i < pageCount; i++) {
                  pages.push(
                    <Button
                      key={i}
                      variant={currentPage === i ? 'default' : 'ghost'}
                      className={`w-8 h-8 sm:w-12 sm:h-12 p-0 rounded-full text-base sm:text-xl ${
                        currentPage === i ? 'bg-[#896D35]' : 'text-white'
                      }`}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </Button>
                  );
                }
              }
              else {
                pages.push(
                  <span key="ellipsis1" className="text-white mx-1">
                    ...
                  </span>
                );

                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                  pages.push(
                    <Button
                      key={i}
                      variant={currentPage === i ? 'default' : 'ghost'}
                      className={`w-8 h-8 sm:w-12 sm:h-12 p-0 rounded-full text-base sm:text-xl ${
                        currentPage === i ? 'bg-[#896D35]' : 'text-white'
                      }`}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </Button>
                  );
                }

                pages.push(
                  <span key="ellipsis2" className="text-white mx-1">
                    ...
                  </span>
                );
              }

              if (pageCount > 3 && !pages.some((button) => button.key! === pageCount.toString())) {
                pages.push(
                  <Button
                    key={pageCount}
                    variant={currentPage === pageCount ? 'default' : 'ghost'}
                    className={`w-8 h-8 sm:w-12 sm:h-12 p-0 rounded-full text-base sm:text-xl ${
                      currentPage === pageCount ? 'bg-[#896D35]' : 'text-white'
                    }`}
                    onClick={() => setCurrentPage(pageCount)}
                  >
                    {pageCount}
                  </Button>
                );
              }

              return pages;
            })()}

            <Button
              variant="ghost"
              className="text-white text-xl disabled:opacity-50 rounded-full h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
              disabled={currentPage === pageCount}
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </Button>

            <Button
              variant="ghost"
              className="text-white text-xl disabled:opacity-50 rounded-full h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setCurrentPage(pageCount)}
              disabled={currentPage === pageCount}
            >
              <ChevronsRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
