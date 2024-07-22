export const formatAddress = (address) => {
  const str1 = address.substring(0, 6)
  const str2 = address.substring(address.length - 4, address.length)
  const result = str1.concat('...', str2)

  return result
}

export const twoCharArr = (arr) => arr.map((value) => value.slice(-2))
