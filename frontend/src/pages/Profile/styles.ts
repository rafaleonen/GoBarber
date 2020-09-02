import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #F4EDE8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.5s;

      &:hover {
        color: ${shade(0.2, '#F4EDE8')};
      }
    }
  }

  > a {
    color: #FF9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.5s;

    &:hover {
        color: ${shade(0.2, '#FF9000')};
      }

    svg {
      margin-right: 16px;
    }
  }
`
