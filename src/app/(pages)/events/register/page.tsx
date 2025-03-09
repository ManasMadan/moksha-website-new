import { redirect } from 'next/navigation';

const RegisterPage = () => {
    redirect('/events');
    return null;
};

export default RegisterPage;
