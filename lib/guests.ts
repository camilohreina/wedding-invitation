export interface Guest {
  id: string
  name: string
  maxGuests: number // maximum number of people in this invitation
  confirmed?: boolean
}

// Guest list - each entry represents one invitation
// The id is used in the URL: /invite/[id]
export const GUESTS: Guest[] = [
  { id: "garcia-lopez", name: "Familia Garcia Lopez", maxGuests: 4 },
  { id: "martinez-ruiz", name: "Familia Martinez Ruiz", maxGuests: 3 },
  { id: "rodriguez-perez", name: "Familia Rodriguez Perez", maxGuests: 5 },
  { id: "carlos-maria", name: "Carlos & Maria Hernandez", maxGuests: 2 },
  { id: "juan-pablo", name: "Juan Pablo Gomez", maxGuests: 1 },
  { id: "andrea-sanchez", name: "Andrea Sanchez Mejia", maxGuests: 2 },
  { id: "felipe-lucia", name: "Felipe & Lucia Torres", maxGuests: 2 },
  { id: "morales-diaz", name: "Familia Morales Diaz", maxGuests: 4 },
  { id: "sebastian-vargas", name: "Sebastian Vargas", maxGuests: 1 },
  { id: "valentina-castillo", name: "Valentina Castillo", maxGuests: 2 },
  { id: "diego-camila", name: "Diego & Camila Restrepo", maxGuests: 2 },
  { id: "ospina-gutierrez", name: "Familia Ospina Gutierrez", maxGuests: 3 },
  { id: "natalia-rios", name: "Natalia Rios", maxGuests: 1 },
  { id: "andres-munoz", name: "Andres Felipe Munoz", maxGuests: 2 },
  { id: "cardona-valencia", name: "Familia Cardona Valencia", maxGuests: 4 },
]

export function getGuestById(id: string): Guest | undefined {
  return GUESTS.find((g) => g.id === id)
}

export function getAllGuestIds(): string[] {
  return GUESTS.map((g) => g.id)
}
