SAMPLE_RECORDS = [
    {"name": "Ada", "score": 95},
    {"name": "Grace", "score": 88},
    {"name": "Linus", "score": 71},
]


def main():
    print(f"[loader] Loaded {len(SAMPLE_RECORDS)} record(s):")
    for record in SAMPLE_RECORDS:
        print(f"  - {record['name']}: {record['score']}")


if __name__ == "__main__":
    main()
