name_chunks_mlr3book = function(file = NULL, path = ".") {
  if (!is.null(file)) {
    qmds = file
  } else {
    qmds = list.files(path, pattern = "^[^_].*\\.qmd$", full.names = TRUE, recursive = TRUE)
  }
  pattern = "^([[:space:]]*```\\{[rR])([[:alnum:]_ -]*)(.*\\})[[:space:]]*$"

  for (qmd in qmds) {
    message(sprintf("Renaming chunks in '%s'", basename(qmd)))

    lines = readLines(qmd)
    ii = which(stringi::stri_detect_regex(lines, "^[[:space:]]*```\\{[rR].*\\}$"))
    labels = sprintf("%s-%03i", stringi::stri_replace_last_fixed(basename(qmd), ".qmd", ""), seq_along(ii))
    lines[ii] = stringi::stri_replace_first_regex(lines[ii], pattern, sprintf("$1 %s$3", labels))

    writeLines(stringi::stri_trim_right(lines), con = qmd)
  }

  invisible(TRUE)
}
