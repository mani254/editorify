function generateUniqueId() {
   let uniqueId = ''
   let possible = 'abcdefghijklmnopqrstuv'

   for (let i = 0; i < 5; i++) {
      uniqueId += possible.charAt(Math.floor(Math.random() * possible.length))
   }

   return uniqueId
}

module.exports = { generateUniqueId }