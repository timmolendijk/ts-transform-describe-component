// This is clearly not a view component, which can be used to verify that our
// plugin does not exhibit falsely positive transform behavior. In other words:
// as soon as our plugin starts transforming this module, we know we have a
// problem.

export function numberedTerm(count: number, singular: string, plural: string) {
  const term = pluralize(count, singular, plural);
  if (count === 0)
    return `no ${plural}`;
  return `${count} ${term}`;
}

// Using this utility every time we need to optionally pluralize a term will
// make internationalization easier.
export function pluralize(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}
