import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import { parseMarkdownLikeText } from "@site/src/utils/textUtils";

//
// This component:
// shows a header on the left, with with some text on the right,
// a quote below and a call to action button below the tagline
//
// Optional props, all defaulting to the original layout so existing pages are
// untouched:
// - titleAboveText: put the title in the text column, above the copy, instead
//   of over the image
// - imageWidth: any CSS width (e.g. "60%") to shrink the image within its
//   column; defaults to the full column width
// - largeDescription: bump the body copy up a step
// - imageLink: makes the image a link to this destination
// - imageAlt: alt text for the image (matters once it is a link)

export default function FeaturedTitleWithText({
  title,
  description,
  quote,
  buttonLabel,
  buttonLink,
  headingDot,
  titleAboveText = false,
  imageWidth,
  largeDescription = false,
  imageLink,
  imageAlt = "",
}) {
  const heading = (
    <h1
      className={clsx({
        headingDot: headingDot,
        [styles.leadingTitle]: titleAboveText,
      })}
    >
      {title}
    </h1>
  );

  const paragraphClass = clsx("black-text", {
    [styles.largeDescription]: largeDescription,
  });

  const image = (
    <img
      className={styles.image}
      style={imageWidth ? { width: imageWidth } : undefined}
      src={"/img/web3.jpg"}
      alt={imageAlt}
    />
  );

  return (
    <div>
      <div className="row">
        <div
          className={clsx("col col--6", styles.leftColumn, {
            [styles.leftColumnAligned]: titleAboveText,
          })}
        >
          {!titleAboveText && heading}
          {imageLink ? (
            <Link className={styles.imageLink} to={imageLink}>
              {image}
            </Link>
          ) : (
            image
          )}
        </div>
        <div className={clsx("col col--6", styles.rightColumn)}>
          {titleAboveText && heading}
          {Array.isArray(description) ? (
            description.map((paragraph, index) => (
              <p key={index} className={paragraphClass}>
                {parseMarkdownLikeText(paragraph)}
              </p>
            ))
          ) : (
            <p className={paragraphClass}>{parseMarkdownLikeText(description)}</p>
          )}
          <h2 className={clsx("red-text", styles.quote)}>{quote}</h2>
          {buttonLabel && buttonLink && (
            <Link
              className="button button--primary button--lg button-dark-tint"
              to={buttonLink}
            >
              {buttonLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
