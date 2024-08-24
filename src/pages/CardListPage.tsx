import React from 'react';
import CardList from '../components/cardListComponent/CardList';

const CardListPage: React.FC = () => {
  return (
    <div>
      <h1 style={{textAlign: "center"}}>Card List</h1>
      <CardList />
    </div>
  );
};

export default CardListPage;