//Funkce na zkrácení jména místnosti (pokud je delší než počet znaků v 2 argumentu, tak zkrátí a dá 3 tečky)

export const displayedRoomName = (name: string, letters: number) => {
    if (name.length < letters) return name;
    const shortName = `${name.slice(0, letters-1)}...`;
    return shortName;
  };