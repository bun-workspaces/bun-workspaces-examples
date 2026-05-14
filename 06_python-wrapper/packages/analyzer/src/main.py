SCORES = [95, 88, 71]


def main():
    average = sum(SCORES) / len(SCORES)
    print(
        f"[analyzer] Analyzed {len(SCORES)} score(s); "
        f"min={min(SCORES)} max={max(SCORES)} avg={average:.2f}"
    )


if __name__ == "__main__":
    main()
