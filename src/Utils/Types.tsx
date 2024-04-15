import {Dispatch } from 'react'
import { UserModel } from 'restclient'

export type NavigationCategoryTypes = "projects" | "work" | "teams" | "nochoice" | "none"

export type NavProps = { setCategory: Dispatch<NavigationCategoryTypes>, user?: UserModel }

export type ModalProps = { setIsOpenModal: Dispatch<boolean>} 
