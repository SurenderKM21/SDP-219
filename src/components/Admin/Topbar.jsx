// import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ModeToggle } from '../mode-toggle';
import { useSelector } from 'react-redux'; // Import useSelector

const Topbar = () => {
    // Access user data from Redux store
    const user = useSelector((state) => state.auth.user);

    return (
        <div className='h-[6vh] w-full flex justify-center items-center shadow-sm shadow-primary'>
            <div className='w-[95%] h-full flex items-center justify-between gap-4'>
                <ModeToggle />
                <div className='flex items-center'>
                    {user && <span className='text-primary font-bold'>{user.email}</span>} {/* Display email */}
                    <Avatar className='ml-2'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>SS</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

export default Topbar;  