import React from 'react'
import { Hero } from '../components/Hero/Hero'
import { NewCollections } from '../components/NewCollections/NewCollections'
import { NewsLetter } from '../components/NewsLetter/NewsLetter'

export const Shop = () => {
  return (
    <div>
        <Hero/>
        <NewCollections/>
        <NewsLetter/>
    </div>
  )
}
