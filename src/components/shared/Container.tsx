import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="container mx-auto px-3 md:px-6 lg:px-8">{children}</div>;
};

export default Container;
