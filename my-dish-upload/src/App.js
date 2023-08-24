import React from 'react';

import DishUploadForm from './components/DishUploadForm';

function App() {
  return (
    <div className='bg-red-500'>
      <header>
        <h1>Dish Upload</h1>
      </header>
      <main>
        <DishUploadForm />        
      </main>
    </div>
  );
}

export default App;
