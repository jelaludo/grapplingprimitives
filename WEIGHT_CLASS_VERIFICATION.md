# IBJJF Weight Class Data Verification

## Verification Status
The weight class data in `src/components/modules/weight-class/weight-class-tool.tsx` has been implemented based on standard IBJJF (International Brazilian Jiu-Jitsu Federation) rules. However, **these values should be verified against the official IBJJF rulebook** for the current competition year.

## Current Implementation

### Adult Male - Gi (with gi)
- Rooster: 0 - 127.5 lbs (Galo)
- Super Feather: 127.6 - 141 lbs (Pluma)
- Feather: 141.1 - 154 lbs (Pena)
- Light: 154.1 - 167.5 lbs (Leve)
- Middle: 167.6 - 181 lbs (Médio)
- Medium Heavy: 181.1 - 194.5 lbs (Meio-Pesado)
- Heavy: 194.6 - 207.5 lbs (Pesado)
- Super Heavy: 207.6 - 221 lbs (Super Pesado)
- Ultra Heavy: 221.1+ lbs (Pesadíssimo)

### Adult Male - No-Gi
- Rooster: 0 - 123.5 lbs (Galo)
- Super Feather: 123.6 - 137 lbs (Pluma)
- Feather: 137.1 - 150 lbs (Pena)
- Light: 150.1 - 163.5 lbs (Leve)
- Middle: 163.6 - 177 lbs (Médio)
- Medium Heavy: 177.1 - 190.5 lbs (Meio-Pesado)
- Heavy: 190.6 - 203.5 lbs (Pesado)
- Super Heavy: 203.6 - 217 lbs (Super Pesado)
- Ultra Heavy: 217.1+ lbs (Pesadíssimo)

### Adult Female - Gi
- Rooster: 0 - 107 lbs (Galo)
- Super Feather: 107.1 - 120 lbs (Pluma)
- Feather: 120.1 - 135 lbs (Pena)
- Light: 135.1 - 150 lbs (Leve)
- Middle: 150.1 - 165 lbs (Médio)
- Medium Heavy: 165.1 - 180 lbs (Meio-Pesado)
- Heavy: 180.1+ lbs (Pesado)

### Adult Female - No-Gi
- Rooster: 0 - 103 lbs (Galo)
- Super Feather: 103.1 - 116 lbs (Pluma)
- Feather: 116.1 - 131 lbs (Pena)
- Light: 131.1 - 146 lbs (Leve)
- Middle: 146.1 - 161 lbs (Médio)
- Medium Heavy: 161.1 - 177 lbs (Meio-Pesado)
- Heavy: 177.1+ lbs (Pesado)

### Juvenile Categories
Juvenile categories (ages 15-17) have different weight classes with fewer divisions. The implementation includes:
- Male Juvenile (Gi and No-Gi)
- Female Juvenile (Gi and No-Gi)

## Verification Steps

1. **Check Official IBJJF Rulebook**: Download the latest IBJJF rulebook from [ibjjf.com](https://ibjjf.com)
2. **Verify Weight Ranges**: Confirm that the weight ranges match the official rules
3. **Check for Updates**: IBJJF may update weight classes annually, so verify against the most recent rules
4. **Test Edge Cases**: Verify that boundary weights (e.g., 127.5, 141.0) are correctly categorized

## Known Considerations

- **Weight Measurement**: IBJJF competitions typically weigh competitors in their gi (for gi divisions) or without gi (for no-gi divisions)
- **Decimal Precision**: The implementation uses 0.1 lb increments for boundaries (e.g., 127.6 vs 127.5)
- **Gi Size Recommendations**: The gi sizing chart is based on standard industry sizing (A0-A6), which may vary by manufacturer

## Sources to Verify Against

1. **Official IBJJF Rulebook**: [ibjjf.com/rules](https://ibjjf.com/rules)
2. **IBJJF Competition Guidelines**: Check competition registration pages
3. **AJP (Abu Dhabi Jiu-Jitsu Pro) Rules**: May have different weight classes
4. **Local Federation Rules**: Regional federations may have variations

## Notes

- The weight class data appears to match standard IBJJF rules as of 2023-2024
- No-gi divisions are typically 4 lbs lighter than gi divisions (to account for gi weight)
- Juvenile divisions have fewer weight classes than adult divisions
- Female divisions have fewer weight classes than male divisions

## Action Items

- [ ] Verify against official IBJJF 2024/2025 rulebook
- [ ] Test with known competitor weights to verify accuracy
- [ ] Add note in UI about checking official rules for competition registration
- [ ] Consider adding a "Last Updated" date to the component

