import Head from 'next/head'
import Image from 'next/image'
import { Inter, Truculenta } from 'next/font/google'
import { useState } from 'react'
import styles from '@/styles/Home.module.css'
import Game from './_app'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return(
    <Game/>
  )
}
