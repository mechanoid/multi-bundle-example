const themes = ['merry x-mas', 'hula hula', 'bonjour']

export const decorate = (...messages) => console.log(themes[Math.ceil(Math.random() * 100 % 3) - 1], ...messages)
