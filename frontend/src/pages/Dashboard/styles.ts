import styled from 'styled-components'

export const Container = styled.div`

`

export const Header = styled.header`
    padding: 32px;
    background: #28262e;
`

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    > img {
        height: 80px;
    }

    button {
        margin-left: auto;
        background: transparent;
        border: 0;

        svg {
            color: #999591;
            width: 20px;
            height: 20px;
        }
    }
`

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 80px;

    img {
        height: 56px;
        width: 56px;
        border-radius: 50%;
    }

    div {
        display: flex;
        margin-left: 56px;
        flex-direction: column;
        line-height: 24px;

        span {
            color: #f4ede8;
        }

        strong {
            color: #ff9000;
        }
    }
`