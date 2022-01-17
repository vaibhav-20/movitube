import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dummyUserPic from '../../assets/dummyUserPic.svg';
import Button from '../../components/Button';
import FormControl from '../../components/FormControl';
import useSignUpLogic from './Logic/useSignUpLogic';

const Signup = () => {
  const {
    handleSubmit,
    handleInput,
    credentials,
    vmTags,
    handleDisplayPic,
    displayPicture,
    displayPictureValidationMessageTag,
  } = useSignUpLogic();

  return (
    <Wrapper className='flex'>
      <div className='center_box'>
        <h3 className='heading'>Sign up to Movies DB</h3>

        <form>
          <div className='preview_row flex'>
            <label className='preview' htmlFor='displayPicture'>
              <img
                src={
                  displayPicture.preview === ''
                    ? dummyUserPic
                    : displayPicture.preview
                }
                alt='preview'
              />

              <input
                id='displayPicture'
                type='file'
                name='displayPicture'
                style={{ display: 'none' }}
                accept='.png, .jpg, .jpeg'
                onChange={handleDisplayPic}
              />
            </label>

            <span className='text'>
              Select display picture
              <span style={{ color: '#dd0a0a', fontSize: '1.2em' }}> *</span>
            </span>

            <p ref={displayPictureValidationMessageTag} className='message' />
          </div>

          <div className='row'>
            <FormControl
              label='Full name'
              name='fullName'
              id='fullName'
              inputType='text'
              placeholder='enter you full name!'
              labelFs='1.1em'
              inputPadding='5px 10px'
              inputFs='0.9em'
              inputColor='#333'
              handleInput={handleInput}
              inputValue={credentials.fullName}
              refObj={vmTags.fullNameValidationMessageTag}
              messageFs='0.9em'
              fcPadding='00px 0px'
            />
          </div>

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
              refObj={vmTags.emailValidationMessageTag}
              messageFs='0.9em'
              fcPadding='5px 0px'
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
              handleInput={handleInput}
              inputValue={credentials.password}
              refObj={vmTags.passwordValidationMessageTag}
              messageFs='0.9em'
              fcPadding='5px 0px'
            />
          </div>

          <div className='row'>
            <FormControl
              label='Confirm assword'
              name='confirmPassword'
              id='confirmPassword'
              inputType='password'
              placeholder='enter you password again'
              labelFs='1.1em'
              inputPadding='5px 10px'
              inputFs='0.9em'
              inputColor='#333'
              handleInput={handleInput}
              inputValue={credentials.confirmPassword}
              refObj={vmTags.confirmPasswordValidationMessageTag}
              messageFs='0.9em'
              fcPadding='5px 0px'
            />
          </div>

          <Button
            type='button'
            fs='0.9em'
            width='100%'
            margin='20px 0 0 0'
            padding='5px 0px'
            borderRadius='5px'
            bgColor='#d8d6d6'
            color='#000'
            transform=''
            handleClick={handleSubmit}
          >
            Signup
          </Button>
        </form>

        <div className='log_in flex'>
        <Link to='/login'>Have an account ?Login</Link>
      </div>
      </div>

     
    </Wrapper>
  );
};

const Wrapper = styled.main`
  flex-direction: column;
  margin-top: 1em;

  .center_box {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    padding: 2px 55px;
    background-color: #D47AE8;
    border-radius:5px;
  }

  .heading {
    text-align: center;
    font-size: 1.1em;
    font-weight: 400;
    padding: 10px 0 5px;
  }

  .preview_row {
    flex-direction: column;

    .preview {
      width: 100px;
      height: 100px;
      display: block;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .text {
      padding: 10px 0 2px;
      font-size: 0.9em;
      text-align: center;
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

  .btn_center {
    span {
      margin-left: 10px;
    }
  }

  .log_in {
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

export default Signup;
