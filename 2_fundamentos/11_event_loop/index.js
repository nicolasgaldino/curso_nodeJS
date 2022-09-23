function a() {
  console.log('a');
};
function b() {
  setTimeout(() => {
    console.log('b');
  }, 1000);
};
function c() {
  console.log('c')
};

a();
b();
c();
