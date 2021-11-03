export default function RandomOtp(): string {
  var val = Math.floor(1000 + Math.random() * 900000);

  return val.toString();
}
