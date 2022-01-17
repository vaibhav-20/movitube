import styled from 'styled-components';
import PropTypes from 'prop-types';

const Loading = ({ size }) => (
  <Wrapper className='flex' size={size}>
    <div className='lds-ellipsis'>
      <div />
      <div />
      <div />
      <div />
    </div>
  </Wrapper>
);
Loading.propTypes = {
  size: PropTypes.string,
};

Loading.defaultProps = {
  size: '80vh',
};

const Wrapper = styled.main`
  height: ${({ size }) => size && size};
  flex-direction: column;

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 85px;
    height: 85px;
  }

  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #e2e2e2;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

export default Loading;
