const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from 'react';

import { MENU_ITEMS, OFFERS, TESTIMONIALS } from '@/data/restaurantData';

const menuImageBySlug = Object.fromEntries(MENU_ITEMS.map((item) => [item.id, item.image]));
const offerImageBySlug = Object.fromEntries(OFFERS.map((offer) => [offer.id, offer.image]));

const readPage = (result) => (Array.isArray(result) ? result : result?.items || []);

export const mapMenuItem = (record) => ({
  id: record.slug || record.id,
  name: record.name,
  description: record.description || '',
  price: record.price,
  category: record.category,
  badge: record.badge || null,
  image: record.image_url || menuImageBySlug[record.slug] || MENU_ITEMS[0].image,
});

export const mapOffer = (record) => ({
  id: record.slug || record.id,
  title: record.title,
  kicker: record.kicker || '',
  includes: (record.includes || '').split('\n').filter(Boolean),
  price: record.price,
  compareAt: record.compare_at || record.price,
  tag: record.tag || 'Combo',
  image: record.image_url || offerImageBySlug[record.slug] || OFFERS[0].image,
});

function useCollection(entity, fallback, mapper, options) {
  const [items, setItems] = useState(fallback);
  const { sort = 'sort_order', query } = options || {};

  useEffect(() => {
    let active = true;
    const request = query
      ? entity.filter(query, { sort, limit: 200 })
      : entity.list({ sort, limit: 200 });

    request
      .then((result) => {
        const records = readPage(result);
        if (!active || records.length === 0) return;
        setItems(records.map(mapper));
      })
      .catch(() => {
        /* keep the bundled menu if the collection cannot be read */
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return items;
}

export function useMenuItems() {
  return useCollection(db.entities.MenuItem, MENU_ITEMS, mapMenuItem, {
    query: { available: { $ne: false } },
  });
}

export function useOffers() {
  return useCollection(db.entities.Offer, OFFERS, mapOffer, {
    query: { active: { $ne: false } },
  });
}

export function useTestimonials() {
  return useCollection(db.entities.Testimonial, TESTIMONIALS, (record) => ({
    name: record.name,
    meta: record.meta || 'Guest',
    rating: record.rating || 5,
    quote: record.quote,
  }), { query: { published: { $ne: false } } });
}