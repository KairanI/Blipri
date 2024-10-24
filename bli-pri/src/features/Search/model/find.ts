export const filterLang = (searchText: string, langMassiv: string[]): string[] => {
    if(!searchText) return langMassiv
    return langMassiv.filter(lang => lang.includes(searchText.toLowerCase()))
}