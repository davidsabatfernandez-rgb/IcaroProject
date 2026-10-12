import type { ShopProduct } from "@/data/shop";

export function ProductArt({
  product,
  compact = false,
}: {
  product: ShopProduct;
  compact?: boolean;
}) {
  const garment =
    product.kind === "shirt"
      ? "M106 69 71 85 27 140 65 166 90 136 90 302 270 302 270 136 295 166 333 140 289 85 254 69Q215 105 180 105Q145 105 106 69Z"
      : product.kind === "tank"
        ? "M119 62 88 94 93 302 267 302 272 94 241 62Q232 120 214 133Q180 148 146 133Q128 120 119 62Z"
        : product.kind === "hoodie"
          ? "M135 70Q120 31 145 22Q180 12 215 22Q240 31 225 70L265 84 307 134 324 283 288 294 272 169 270 315 90 315 88 169 72 294 36 283 53 134 95 84Z"
          : "M91 203Q95 98 180 86Q265 98 269 203L278 218Q310 229 315 252Q272 274 218 252L99 236Q61 225 91 203Z";
  return (
    <div
      className={`ip-shop-art ip-shop-art-${product.kind}${product.colorName === "Carbón" || product.colorName === "Cobre" ? " ip-shop-art-dark" : ""}${compact ? " ip-shop-art-compact" : ""}`}
    >
      <svg
        viewBox="0 0 360 360"
        role="img"
        aria-label={`Ilustración conceptual de ${product.name}, color ${product.colorName.toLowerCase()}, con el logo de ICARO`}
      >
        <ellipse
          cx="180"
          cy="326"
          rx="113"
          ry="12"
          fill="#443326"
          opacity=".08"
        />
        <path
          d={garment}
          fill={product.color}
          stroke="#493a30"
          strokeOpacity=".32"
          strokeWidth="1.5"
        />
        {product.kind === "shirt" && (
          <>
            <path
              d="M106 69Q145 116 180 116Q215 116 254 69M90 288H270M65 166 59 161M295 166 301 161"
              fill="none"
              stroke="#493a30"
              strokeOpacity=".3"
            />
            <path
              d="M107 141V282M253 141V282"
              fill="none"
              stroke="#fff"
              strokeOpacity=".18"
            />
          </>
        )}
        {product.kind === "tank" && (
          <path
            d="M119 62Q133 143 180 147Q227 143 241 62M94 288H266"
            fill="none"
            stroke="#493a30"
            strokeOpacity=".35"
          />
        )}
        {product.kind === "hoodie" && (
          <>
            <path
              d="M135 70Q180 97 225 70M151 32 148 113M209 32 212 113M116 244 136 218H224L244 244V278H116Z"
              fill="none"
              stroke="#493a30"
              strokeOpacity=".35"
            />
          </>
        )}
        {product.kind === "cap" && (
          <path
            d="M180 88V200M93 204Q177 183 269 204M104 238Q172 218 278 220"
            fill="none"
            stroke="#493a30"
            strokeOpacity=".35"
          />
        )}
      </svg>
      <div className="ip-shop-art-logo" aria-hidden="true">
        {/* The logo asset is adapted from the reference supplied by ICARO. */}
        <img
          src="/images/icaro-team-logo.png"
          alt=""
          width="1536"
          height="1024"
          loading="lazy"
        />
      </div>
      {!compact && (
        <span className="ip-shop-art-caption">
          DISEÑO CONCEPTUAL / ICARO TEAM
        </span>
      )}
    </div>
  );
}
