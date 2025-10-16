import { postApiV1NodeSummary } from '@/request/Node';
import { DomainRecommendNodeListResp } from '@/request/types';
import { useAppSelector } from '@/store';
import { Box, IconButton, Stack } from '@mui/material';
import { Ellipsis, Icon, message } from '@ctzhian/ui';
import { CSSProperties, forwardRef, HTMLAttributes, useState } from 'react';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  item: DomainRecommendNodeListResp;
  withOpacity?: boolean;
  isDragging?: boolean;
  dragHandleProps?: any;
  handleRemove?: (id: string) => void;
  refresh?: () => void;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      item,
      withOpacity,
      isDragging,
      style,
      dragHandleProps,
      handleRemove,
      refresh,
      ...props
    },
    ref,
  ) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? '0.5' : '1',
      borderRadius: '10px',
      cursor: isDragging ? 'grabbing' : 'grab',
      backgroundColor: '#ffffff',
      width: '100%',
      minWidth: '0px',
      ...style,
    };

    return (
      <Box ref={ref} style={inlineStyles} {...props}>
        <Stack
          direction={'row'}
          gap={1}
          sx={{
            p: 1,
            height: '100%',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '10px',
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1,
              flexGrow: 1,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '10px',
            }}
          >
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              {item.emoji ? (
                <Box sx={{ fontSize: 14, color: '#2f80f7', flexShrink: 0 }}>
                  {item.emoji}
                </Box>
              ) : (
                <Icon
                  type={item.type === 1 ? 'icon-wenjianjia' : 'icon-wenjian'}
                  sx={{ fontSize: 14, color: '#2f80f7', flexShrink: 0 }}
                />
              )}
              <Ellipsis sx={{ flex: 1, width: 0, lineHeight: '32px' }}>
                {item.name}
              </Ellipsis>
            </Stack>
          </Box>
          <Stack justifyContent={'space-between'} sx={{ flexShrink: 0 }}>
            <IconButton
              size='small'
              onClick={e => {
                e.stopPropagation();
                handleRemove?.(item.id!);
              }}
              sx={{
                color: 'text.tertiary',
                ':hover': { color: 'error.main' },
                width: '28px',
                height: '28px',
              }}
            >
              <Icon type='icon-shanchu2' sx={{ fontSize: '12px' }} />
            </IconButton>

            <IconButton
              size='small'
              sx={{
                cursor: 'grab',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
              {...dragHandleProps}
            >
              <Icon type='icon-drag' />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    );
  },
);

export default Item;
