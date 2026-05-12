function readPackage(pkg, context) {
  // Allow build scripts for packages that need native compilation
  if (pkg.name === 'esbuild' || pkg.name === 'sharp' || pkg.name === 'swup' || pkg.name === 'workerd') {
    pkg.pnpm = pkg.pnpm || {}
    pkg.pnpm.overrides = pkg.pnpm.overrides || {}
  }
  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
