import { AccordionPresetNames } from './accordion.presets'

export interface AccordionProps {
  /**
   *Varriable for state of accordion
   */
  sections: ISection[]

  /**
   * One of the different types of  presets.
   */
  preset?: AccordionPresetNames
}

export interface ISection {
  title: string
  content: string
}
