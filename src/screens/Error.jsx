import styled from 'styled-components';

const Error = () => {
  console.log('Error');

  return (
    <Wrapper className='flex'>
      <h2>Error 404! Sorry the page you have requested does not exists!</h2>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin-top: 20px;
  height: 80vh;

  h2 {
    text-align: center;
    font-weight: 400;
    font-size: 1.5em;
  }
`;

export default Error;
