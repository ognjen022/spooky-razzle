import { ProfileState } from './models'

export const selectInitials = (state: ProfileState): string => {

  const firstName = state.metadata?.FirstName || ''
  const lastName = state.metadata?.LastName || ''
    const fullName = state.name || ''

  var initials = firstName.length > 0 && lastName.length > 0
    ? `${firstName.substring(0, 1)}${lastName.substring(0, 1)}`
        : fullName !== '' 
            ? fullName.substring(0, 1) // fallback to full name if metadata is null
            : ''

  initials = initials.toUpperCase()
  return initials
}

export const selectIntercomInfo = (state: ProfileState): any => ({
  email: state.email,
  name: `${selectFirstName(state)} ${selectLastName(state)}`
});

export const selectFirstName = (state: ProfileState): string => state.metadata?.FirstName || ''
export const selectLastName = (state: ProfileState): string => state.metadata?.LastName || ''

