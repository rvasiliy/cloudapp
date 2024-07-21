export default async function home(ctx) {
   await ctx.render('home', {value: Math.random()});
}
