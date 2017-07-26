import React from 'react';
import Rating from 'component-root/Rating';

/** Nice Rating */
export default function ExampleRating() {
  const val = 3;
  return <Rating value={val} readonly={false} />
}
