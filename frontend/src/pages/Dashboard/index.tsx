import React from 'react'
import { FiPower, FiClock } from 'react-icons/fi'

import { Container, Header, HeaderContent, Profile, Content, Schedule, Calendar, NextAppointment, Section, Appointment } from './styles'
import { useAuth } from '../../hooks/auth'
import logoImg from '../../assets/logo.svg'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber"/>

          <Profile>
            <img 
              src={user.avatar_url}
              alt={user.name}
            />
          
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir :</strong>
            <div>
              <img src="https://avatars2.githubusercontent.com/u/60005589?s=460&u=550827fd57a4fa09357d90a1f9c956876e33677b&v=4" alt="Rafael Leonen"/>
              <strong>Rafael Leonen</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars2.githubusercontent.com/u/60005589?s=460&u=550827fd57a4fa09357d90a1f9c956876e33677b&v=4" alt="Rafael Leonen"/>
                <strong>Rafael Leonen</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars2.githubusercontent.com/u/60005589?s=460&u=550827fd57a4fa09357d90a1f9c956876e33677b&v=4" alt="Rafael Leonen"/>
                <strong>Rafael Leonen</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  )
}

export default Dashboard
