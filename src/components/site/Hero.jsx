import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Star, Truck } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { IMG } from '@/data/images';
import { BRAND } from '@/data/restaurantData';

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-mist">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-peach/50 blur-3xl"
        aria-hidden="true"
      />
      <div className="ff-container relative py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.p
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0}
              className="eyebrow flex items-center gap-3 text-ember"
            >
              <span className="h-px w-7 bg-ember" />
              Fresh flavors. Real ingredients.
            </motion.p>

            <motion.h1
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0.08}
              className="type-hero mt-5 uppercase text-ink"
            >
              Big flavor.
              <br />
              Fresh every day.
            </motion.h1>

            <motion.p
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0.16}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft"
            >
              Smash burgers pressed to order, stone-baked pizza, properly crispy chicken and plates
              straight off the grill — cooked fresh, served warm, every single service.
            </motion.p>

            <motion.div
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0.24}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to="/menu"
                className="group inline-flex items-center justify-center gap-2 rounded-[10px] bg-ember px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-ember-dark"
              >
                Explore Menu
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ember/40 hover:text-ember"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.9} />
                Order Online
              </Link>
            </motion.div>

            <motion.div
              variants={rise}
              initial="hidden"
              animate="show"
              custom={0.32}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-[12.5px] text-ink-soft"
            >
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-ember" strokeWidth={1.8} />
                {BRAND.deliveryNote}
              </span>
              <span className="hidden h-4 w-px bg-line sm:block" />
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-sand text-sand" strokeWidth={0} />
                <span className="font-semibold text-ink">4.9</span>
                <span>from 1,200+ guests</span>
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div
              className="absolute -right-4 top-6 h-[88%] w-[88%] rounded-[28px] bg-peach"
              aria-hidden="true"
            />
            <div
              className="absolute -left-3 bottom-10 h-24 w-24 rounded-full bg-blush"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line bg-white shadow-lift sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src={IMG.hero}
                alt="A double cheeseburger with melted cheese served with golden fries"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-soft backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
                Made fresh daily
              </span>
            </div>

            <div className="absolute -bottom-5 left-4 hidden items-center gap-3 rounded-xl border border-line bg-white p-3 pr-5 shadow-soft sm:flex">
              <div className="h-11 w-11 overflow-hidden rounded-lg bg-mist">
                <Image src={IMG.smashBurger} alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-ink">Signature Smash Burger</p>
                <p className="text-[11.5px] text-ink-soft">Rs. 850 · Cooked to order</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}