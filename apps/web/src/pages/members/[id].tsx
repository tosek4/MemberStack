import type { GetServerSideProps, NextPage } from 'next'

import { MemberDetails } from '@domain/Members/components/MemberDetails'
import { Member } from '@domain/Members/types'

interface MemberDetailsPageProps {
  member: Member
}

const members: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+389 70 123 456',
    plan: 'Premium',
    startDate: '01 Sep 2026',
    endDate: '01 Sep 2027',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+389 71 234 567',
    plan: 'Standard',
    startDate: '15 Mar 2026',
    endDate: '20 Sep 2026',
    status: 'expiring',
  },
]

const MemberDetailsPage: NextPage<MemberDetailsPageProps> = ({ member }) => {
  return <MemberDetails member={member} />
}

export const getServerSideProps: GetServerSideProps<
  MemberDetailsPageProps
> = async (context) => {
  const id = context.params?.id

  const member = members.find((currentMember) => currentMember.id === id)

  if (!member) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      member,
    },
  }
}

export default MemberDetailsPage
