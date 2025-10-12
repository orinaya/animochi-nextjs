'use client'

import { SectionContent } from '../ui'
// import Image from "next/image"

interface BenefitsSectionProps {
  children?: React.ReactNode
}

export default function BenefitsSection ({ children }: BenefitsSectionProps): React.ReactNode {
  return (
    <div>
      {/* <Section
        id='benefits'
        title='Pourquoi choisir Animochi ?'
        subtitle='Une expérience unique qui combine nostalgie et innovation pour créer des liens authentiques avec votre compagnon virtuel.'
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
      </Section> */}

      <SectionContent
        title="Une expérience d'adoption"
        highlightedWords='unique'
        content='Une expérience unique qui combine nostalgie et innovation pour créer des liens authentiques avec votre compagnon virtuel.'
        alignment='center'
        titleSize='md'
      />

      {/* Composant Group123222
      {/* <div className='w-full h-[860px] relative text-left text-[32px]'>
        {/* Images commentées - à ajouter plus tard
        {/* <Image className="absolute top-[56.5px] left-[168px] rounded-[40px] w-[416px] h-[702.5px]" width={416} height={702.5} sizes="100vw" alt="" />
        {/* <Image className="absolute top-[65px] left-[895.21px] rounded-[40px] w-[612px] h-[194px]" width={612} height={194} sizes="100vw" alt="" />
        {/* <Image className="absolute top-[348px] left-[723.21px] rounded-[40px] w-[612px] h-[195px]" width={612} height={195} sizes="100vw" alt="" />
        {/* <Image className="absolute top-[647px] left-[914.21px] rounded-[40px] w-[567px] h-[195px]" width={567} height={195} sizes="100vw" alt="" />
        {/* <Image className="absolute top-[127px] left-0 w-[750.9px] h-[500.6px] object-cover" width={750.9} height={500.6} sizes="100vw" alt="" />

        <div className='absolute top-[153px] left-[320px] rounded-[12px] bg-blueberry-950 w-[103px] h-[50.8px] flex items-center justify-center px-[11px] py-[5px] box-border text-latte-50'>
          <div className='relative uppercase font-semibold'>Milo</div>
        </div>

        <div className='absolute top-[574px] left-1/2 transform -translate-x-1/2 -translate-x-[479.6px] flex flex-col items-center'>
          <div className='relative font-medium'>Le panda roux</div>
          <div className='relative text-[20px] uppercase font-light text-center'>Aventurier</div>
        </div>

        <div className='absolute top-[22px] left-[897.21px] uppercase transform rotate-[3.2deg] origin-top-left'>
          <span className='font-light'>Choisis son </span>
          <span className='font-extrabold'>tamagotchi</span>
        </div>

        <div className='absolute top-[15px] left-[170.21px] uppercase transform rotate-[3.2deg] origin-top-left'>
          <span className='font-light'>Adopte ton </span>
          <span className='font-extrabold'>monstre</span>
        </div>

        <div className='absolute top-[304px] left-[725.21px] uppercase flex items-center w-[301px] transform rotate-[3.2deg] origin-top-left'>
          <span className='w-full'>
            <span className='font-light'>Gère ses </span>
            <span className='font-extrabold'>états</span>
          </span>
        </div>

        <div className='absolute top-[377px] left-[828.42px] text-[15px] uppercase transform rotate-[3.2deg] origin-top-left'>faim</div>
        <div className='absolute top-[389px] left-[1107.42px] text-[15px] uppercase transform rotate-[3.2deg] origin-top-left'>énergie</div>
        <div className='absolute top-[446px] left-[828.42px] text-[15px] uppercase transform rotate-[3.2deg] origin-top-left'>Humeur</div>
        <div className='absolute top-[458px] left-[1107.42px] text-[15px] uppercase transform rotate-[3.2deg] origin-top-left'>propreté</div>

        <div className='absolute top-[603px] left-[916.21px] uppercase transform rotate-[3.2deg] origin-top-left'>
          <span className='font-light'>compare tes </span>
          <span className='font-extrabold'>MONSTRES</span>
        </div>

        <div className='absolute top-[727px] left-[1125px] uppercase font-extrabold transform rotate-[3.2deg] origin-top-left'>2</div>
        <div className='absolute top-[769px] left-[1128px] text-[24px] uppercase font-extrabold transform rotate-[3.2deg] origin-top-left'>3</div>
        <div className='absolute top-[671px] left-[1126px] text-[48px] uppercase font-extrabold transform rotate-[3.2deg] origin-top-left'>1</div>

        {/* Images de créatures commentées
        {/* <Image className="absolute top-[269px] left-[98px] w-[265.3px] h-[176.9px] object-cover" width={265.3} height={176.9} sizes="100vw" alt="" />
        {/* <Image className="absolute top-[273px] left-[381px] w-[265.3px] h-[176.9px] object-cover" width={265.3} height={176.9} sizes="100vw" alt="" />
        {/* <Image className="absolute top-[74px] left-[1119.77px] w-[181px] h-[176.2px] object-contain" width={181} height={176.2} sizes="100vw" alt="" /
        {/* <Image className="absolute top-[107.63px] left-[976.21px] w-[115.7px] h-[115.7px] object-contain mix-blend-luminosity" width={115.7} height={115.7} sizes="100vw" alt="" />
        {/* <Image className="absolute top-[117px] left-[1343.21px] w-[119.3px] h-[121.3px] object-contain mix-blend-luminosity" width={119.3} height={121.3} sizes="100vw" alt="" />
        {/* <Image className="absolute h-[5%] w-[1.59%] top-[16.38%] right-[25.76%] bottom-[78.62%] left-[72.65%] max-w-full overflow-hidden max-h-full" width={24} height={43} sizes="100vw" alt="" />
        {/* <Image className="absolute h-[5%] w-[1.59%] top-[17.44%] right-[11.88%] bottom-[77.56%] left-[86.53%] max-w-full overflow-hidden max-h-full object-contain" width={24} height={43} sizes="100vw" alt="" />

        {/* Masques d'images commentés
        <div className='absolute top-[374px] left-[759.21px] w-[56px] h-[56px]'>
          {/* <Image className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-[69.91px] -translate-y-[65.57px] w-[139.5px] h-[131.1px] object-cover" width={139.5} height={131.1} sizes="100vw" alt="" />
        </div>

        <div className='absolute top-[454px] left-[1044.21px] w-[56px] h-[56px]'>
          {/* <Image className="absolute -top-[37.57px] -left-[41.91px] w-[139.5px] h-[131.1px] object-cover" width={139.5} height={131.1} sizes="100vw" alt="" />
        </div>

        <div className='absolute top-[443px] left-[759.21px] w-[56px] h-[56px]'>
          {/* <Image className="absolute -top-[37.57px] -left-[41.55px] w-[139.5px] h-[131.1px] object-cover" width={139.5} height={131.1} sizes="100vw" alt="" />
        </div>

        <div className='absolute top-[388px] left-[1044.21px] w-[56px] h-[56px]'>
          {/* <Image className="absolute -top-[37.57px] -left-[41.91px] w-[139.5px] h-[131.1px] object-cover" width={139.5} height={131.1} sizes="100vw" alt="" />
        </div>

        {/* Barres de progression et éléments visuels
        <div className='absolute top-[397px] left-[826.71px] rounded-[9px] bg-latte-50 w-[192.4px] h-[26.3px] transform rotate-[3.3deg] origin-top-left' />
        <div className='absolute top-[682px] left-[1150.41px] shadow-[0px_0px_9px_rgba(255,191,51,0.68)] rounded-[9px] bg-[#ffbf33] border-2 border-latte-50 w-[242.8px] h-[42px] transform rotate-[3.3deg] origin-top-left' />
        <div className='absolute top-[732px] left-[1147.86px] rounded-[9px] bg-latte-50 w-[212.1px] h-[32.5px] transform rotate-[3.3deg] origin-top-left' />
        <div className='absolute top-[771px] left-[1145.51px] rounded-[9px] bg-latte-50 w-[187.7px] h-[26.3px] transform rotate-[3.3deg] origin-top-left' />
        <div className='absolute top-[409px] left-[1105.71px] rounded-[9px] bg-latte-50 w-[192.4px] h-[26.3px] transform rotate-[3.3deg] origin-top-left' />
        <div className='absolute top-[466px] left-[826.71px] rounded-[9px] bg-latte-50 w-[192.4px] h-[26.3px] transform rotate-[3.3deg] origin-top-left' />
        <div className='absolute top-[478px] left-[1105.71px] rounded-[9px] bg-latte-50 w-[192.4px] h-[26.3px] transform rotate-[3.3deg] origin-top-left' />

        {/* Barres colorées pour les états
        <div className='absolute top-[397px] left-[826.71px] rounded-[9px] bg-strawberry-400 w-[42.6px] h-[26.3px] transform rotate-[3.3deg] origin-top-left' />
        <div className='absolute top-[409px] left-[1105.71px] rounded-[9px] bg-red-600 w-[16.1px] h-[26.3px] transform rotate-[3.3deg] origin-top-left' />
        <div className='absolute top-[466px] left-[826.71px] rounded-[9px] bg-peach-400 w-[92.5px] h-[26.3px] transform rotate-[3.3deg] origin-top-left' />
        <div className='absolute top-[478px] left-[1105.71px] rounded-[9px] bg-green-400 w-[192.4px] h-[26.3px] transform rotate-[3.3deg] origin-top-left' />

        {/* Noms des joueurs
        <div className='absolute top-[689px] left-[1159.65px] text-[24px] uppercase font-semibold transform rotate-[3.2deg] origin-top-left'>jean</div>
        <div className='absolute top-[738px] left-[1159.32px] text-[19px] uppercase font-semibold transform rotate-[3.2deg] origin-top-left'>Pierre</div>
        <div className='absolute top-[776px] left-[1154.16px] text-[15px] uppercase font-semibold transform rotate-[3.2deg] origin-top-left'>paul</div>

        {/* Points *
        <div className='absolute top-[697px] left-[1312.65px] text-[24px] uppercase transform rotate-[3.2deg] origin-top-left'>
          <span className='font-extrabold'>40</span>
          <span className='font-light'>pts</span>
        </div>
        <div className='absolute top-[745px] left-[1300.32px] text-[19px] uppercase transform rotate-[3.2deg] origin-top-left'>
          <span className='font-extrabold'>28</span>
          <span className='font-light'>pts</span>
        </div>
        <div className='absolute top-[783px] left-[1291.05px] text-[15px] uppercase transform rotate-[3.2deg] origin-top-left'>
          <span className='font-extrabold'>5</span>
          <span className='font-light'>pts</span>
        </div>

        {/* Images finales commentées *
        {/* <Image className="absolute top-[594px] left-[825px] w-[398px] h-[266px] object-cover" width={398} height={266} sizes="100vw" alt="" />
        {/* <Image className="absolute top-0 left-[855px] max-w-full overflow-hidden h-[238px]" width={4} height={238} sizes="100vw" alt="" />
        {/* <Image className="absolute top-[334px] left-[1403px] max-w-full overflow-hidden h-[238px]" width={4} height={238} sizes="100vw" alt="" />
        {/* <Image className="absolute top-[594px] left-[856px] max-w-full overflow-hidden h-[238px]" width={4} height={238} sizes="100vw" alt="" />
      </div>

      {/* <div className='max-w-6 grid grid-cols-1 md:grid-cols-3 gap-8'>
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div> */}
    </div>

  )
}
