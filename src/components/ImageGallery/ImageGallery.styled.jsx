import styled from '@emotion/styled';

export const ImageGalleryList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 30px;
  padding: 0;
  list-style: none;
`;
