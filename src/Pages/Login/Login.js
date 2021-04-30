import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { API, KAKAO } from '../../config';
import Modal from '../../Components/Modal/Modal';
import styled from 'styled-components';

const Login = () => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = status => {
    setModalOpen(status);
  };

  const kakaoLogin = () => {
    const { Kakao } = window;

    Kakao.Auth.login({
      success: function (res) {
        setModalOpen(false);

        fetch(`${API}/users/login/kakao`, {
          method: 'POST',
          headers: {
            Authorization: res.access_token,
          },
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res.ACCESS_TOKEN);
            if (res.ACCESS_TOKEN) {
              localStorage.setItem('access_token', res.ACCESS_TOKEN);
              alert('로그인 성공!');
              history.push('/');
            } else {
              alert('로그인 실패!');
            }
          });
      },
      fail: function (err) {
        console.log('kakao login 오류', err);
      },
    });
  };

  return (
    <>
      <button
        onClick={() => {
          handleModal(true);
        }}
      >
        Login
      </button>
      {modalOpen > 0 && (
        <Modal
          open={modalOpen}
          close={() => {
            handleModal(false);
          }}
          header="소셜 로그인"
        >
          <KakaoBtn onClick={kakaoLogin} src={KAKAO.loginBtn}></KakaoBtn>
          <FindPassword href={KAKAO.findPassword} target="_blank">
            비밀번호를 잊으셨나요?
          </FindPassword>
        </Modal>
      )}
    </>
  );
};

const KakaoBtn = styled.img`
  width: 70%;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const FindPassword = styled.a`
  display: block;
  padding: 2rem 0 1rem 0;
  font-size: ${({ theme }) => theme.fontSizeSmall};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  color: ${({ theme }) => theme.black};
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
    cursor: pointer;
  }
`;

export default Login;
