import React from 'react';

function Gallery(props) {
  const { currentCategory } = props;
  return (
    <section>
        <>
          <div>{currentCategory.description}</div>
        </>
    </section>
  );
}

export default Gallery;