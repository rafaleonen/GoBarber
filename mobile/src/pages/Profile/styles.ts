import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 30px ${Platform.OS === 'android' ? 120 : 40}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
  text-align: left;
`;

export const UserAvatarButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  margin-left: 50px;
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`

export const BackButton = styled.TouchableOpacity``

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 120px;
`
