import {Dispatch } from 'react'

export type NavigationCategoryTypes = "projects" | "work" | "teams" | "nochoice" | "none"

export type NavProps = { setCategory: Dispatch<NavigationCategoryTypes> }

export type ModalProps = { setIsOpenModal: Dispatch<boolean>} 
