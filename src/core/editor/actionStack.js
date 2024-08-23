/** 
* A class representing a stack with a fixed maximum size.
* It operates in a Last-In-First-Out (LIFO) manner, with the ability to push, pop, and peek at elements.
* When the stack exceeds the maximum size, the oldest elements are removed to make space for new ones.
**/
class ActionStack {
   constructor(maxSteps = 30) {
      this.stack = [];
      this.maxSize = maxSteps;
   }

   isEmpty() {
      return this.stack.length === 0;
   }

   pop() {
      if (this.isEmpty()) return null;
      return this.stack.pop();
   }

   push(element) {
      if (this.stack.length >= this.maxSize) this.stack.shift();
      this.stack.push(element);
      return element;
   }

   peek() {
      if (this.isEmpty()) return null;
      return this.stack[this.stack.length - 1];
   }

   clear() {
      this.stack = [];
   }

}

module.exports = ActionStack;
