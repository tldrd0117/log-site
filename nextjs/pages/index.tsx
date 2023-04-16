import Image from 'next/image'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {}
    }
}

export default function Home({}: any) {
  return <>
    <div>
        
    </div>
  </>
}
