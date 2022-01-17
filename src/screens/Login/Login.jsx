import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormControl from '../../components/FormControl';
import Button from '../../components/Button';
import useLoginLogic from './Logic/useLoginLogic';

const Login = () => {
  const {
    handleInput,
    credentials,
    handleSubmit,
    emailValidationMessageTag,
    passwordValidationMessageTag,
    loginAsRandomUser,
  } = useLoginLogic();

  return (
    <Wrapper className='flex'>
      <div className='center_box'>
        <h3 className='heading'>Log in to MoviTube</h3>

        <form onSubmit={handleSubmit}>
          <div className='row'>
            <FormControl
              label='Email'
              name='email'
              id='email'
              inputType='text'
              placeholder='enter you email address!'
              labelFs='1.1em'
              inputColor='#333'
              inputPadding='5px 10px'
              inputFs='0.9em'
              handleInput={handleInput}
              inputValue={credentials.email}
              refObj={emailValidationMessageTag}
              messageFs='0.9em'
            />
          </div>

          <div className='row'>
            <FormControl
              label='Password'
              name='password'
              id='password'
              inputType='password'
              placeholder='enter you password!'
              labelFs='1.1em'
              inputPadding='5px 10px'
              inputFs='0.9em'
              inputColor='#333'
              fcPadding=''
              handleInput={handleInput}
              inputValue={credentials.password}
              refObj={passwordValidationMessageTag}
              messageFs='0.9em'
            />
          </div>

          <Button
            type='submit'
            fs='0.9em'
            width='100%'
            margin='25px 0 0 0'
            padding='5px 0px'
            borderRadius='5px'
            bgColor='#d8d6d6'
            color='#000'
            transform=''
          >
            Login
          </Button>

          <Button
            type='button'
            fs='0.9em'
            width='100%'
            margin='25px 0 0 0'
            padding='5px 0px'
            borderRadius='5px'
            bgColor='#db584f'
            color='#fcfcfc'
            transform=''
            handleClick={loginAsRandomUser}
          >
            Login as random user
          </Button>
        </form>
        <div className='sign_up flex'>
        <Link to='/signup'>Don't have an account ? Sign up</Link>
      </div>
      </div>

      
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 70vh;
  flex-direction: column;

  .center_box {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    padding: 20px 50px;
    border-radius:5px;
    margin-top:1rem;

    .heading {
      text-align: center;
      font-size: 1.1em;
      font-weight: 400;
      padding: 4px 0 15px;
    }
  }

  .or_row {
    justify-content: space-between;
    margin: 20px 0 0px;

    .left,
    .right {
      width: 40%;
      height: 1px;
      background: #fdfdfd;
      border-radius: 10px;
    }
  }

  padd .btn_center {
    span {
      margin-left: 10px;
    }
  }

  .sign_up {
    box-shadow: rgb(145, 196, 131) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-top: 15px;
    padding: 5px 25px;
background-color: #4E9F3D;
border-radius: 5px;
    a {
      color: #fff;
    }
  }
`;

export default Login;
