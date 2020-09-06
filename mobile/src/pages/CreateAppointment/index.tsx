import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'
import { StatusBar, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'

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
  ProviderListContainer,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  Content,
  CreateAppointmentButton,
  CreateAppointmentText
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

interface AvailabilityItem {
  hour: number
  available: boolean
}

const CreateAppointment: React.FC = () => {
  const route = useRoute()
  const routeParams = route.params as RouteParams

  const [providers, setProviders] = useState<Array<Provider>>()
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availability, setAvailability] = useState<Array<AvailabilityItem>>([])
  const [selectedHour, setSelectedHour] = useState(0)

  const { navigate, goBack } = useNavigation()

  const { user } = useAuth()

  const handleSelectedProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId)
  }, [])

  const navigateBack = useCallback(() => {
    goBack()
  }, [navigate])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(oldState => !oldState)
  }, [])

  const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false)
    }

    if (date) {
      setSelectedDate(date)
    }
  }, [])

  const handleSelectedHour = useCallback((hour: number) => {
    setSelectedHour(hour)
  }, [])

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour, }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00')
        }
      })
  }, [availability])

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00')
        }
      })
  }, [availability])

  useEffect(() => {
    api.get('/providers').then(response => (
      setProviders(response.data)
    ))
  }, [])

  useEffect(() => {
    api.get(`/providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then(response => {
      setAvailability(response.data)
    })
  }, [selectedDate, selectedProvider])

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate)

      date.setHours(selectedHour)
      date.setMinutes(0)

      await api.post('appointments', {
        provider_id: selectedProvider,
        date
      })

      navigate('AppointmentCreated', {
        date: date.getTime()
      })
    } catch(e) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente'
      )
    }
  }, [selectedDate, selectedHour, selectedProvider])

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

      <Content>
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

        <Calendar>
          <Title>Escolha a data</Title>

          <OpenDatePickerButton
            onPress={handleToggleDatePicker}
          >
            <OpenDatePickerText>Selecionar data</OpenDatePickerText>
          </OpenDatePickerButton>

          {showDatePicker &&
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="calendar"
              onChange={handleDateChanged}
            />
          }
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent>
              {morningAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  key={hourFormatted}
                  available={available}
                  onPress={() => handleSelectedHour(hour)}
                >
                  <HourText
                    selected={selectedHour === hour}
                  >
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            <SectionContent>
              {afternoonAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  key={hourFormatted}
                  available={available}
                  onPress={() => handleSelectedHour(hour)}
                >
                  <HourText
                    selected={selectedHour === hour}
                  >
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton
          onPress={handleCreateAppointment}
        >
          <CreateAppointmentText>Agendar</CreateAppointmentText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
