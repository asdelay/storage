import React, { FC } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Search from './Search';
import FileUploader from './FileUploader';
import { logoutUser } from '@/src/lib/actions/user.actions';

interface HeaderProps {
  userId: string;
  accountId: string;
}

const Header: FC<HeaderProps> = ({ userId, accountId }) => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            'use server';
            await logoutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              width={24}
              height={24}
              alt="log out"
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
