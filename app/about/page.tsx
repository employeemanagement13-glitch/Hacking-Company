import AboutUsScrollSection from '@/Components/About/AboutHeader'
import CoreValuesSection from '@/Components/About/CoreValues'
import GlobalPartners from '@/Components/About/GlobalPartners'
import GlobalPresenceSection from '@/Components/About/GlobalPresence'
import MissionVisionSection from '@/Components/About/MissionVision'
import LeadershipSection from '@/Components/Home/LeaderShip'
import { coreValues } from "@/lib/data";

const coreValueswithTitle={
  title: "Core Values", 
  para: "The principles that shape our identity and drive our work",
  coreValues: coreValues
}

const page = () => {
  return (
    <main className='h-fit p-0 m-0 box-border'>
    <AboutUsScrollSection />
    <MissionVisionSection />
    <CoreValuesSection {...coreValueswithTitle}/>
    <GlobalPartners />
    <GlobalPresenceSection />
    <LeadershipSection />
    </main>
  )
}

export default page