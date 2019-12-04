async function foo() {
  let ret = await bar();
  console.log(ret); 
}

async function bar() {
  return 'hello bar';
}

foo();