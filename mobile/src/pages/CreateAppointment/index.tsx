import React, { useCallback, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'
import { StatusBar } from 'react-native';

import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProviderList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  ProviderListContainer
} from './styles'
import api from '../../services/api';

interface RouteParams {
  providerId: string
}

export interface Provider {
  id: string
  name: string
  avatar_url: string
}

const CreateAppointment: React.FC = () => {
  const route = useRoute()
  const routeParams = route.params as RouteParams

  const [providers, setProviders] = useState<Array<Provider>>()
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId)

  const { navigate, goBack } = useNavigation()

  const { user } = useAuth()

  const handleSelectedProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId)
  }, [])

  const navigateBack = useCallback(() => {
    goBack()
  }, [navigate])

  useEffect(() => {
    api.get('/providers').then(response => (
      setProviders(response.data)
    ))
  }, [])

  return (
    <Container>
      <StatusBar backgroundColor='#28262e' />
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <ProviderListContainer>
        <ProviderList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={selectedProvider === provider.id && true}
              onPress={() => handleSelectedProvider(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName selected={selectedProvider === provider.id && true}> {provider.name}</ProviderName>
            </ProviderContainer>
          )}
        />
      </ProviderListContainer>
    </Container>
  );
};

export default CreateAppointment;
