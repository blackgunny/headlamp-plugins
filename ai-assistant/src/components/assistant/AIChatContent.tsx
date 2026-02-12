import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Alert, Box, Button } from '@mui/material';
import React from 'react';
import { Prompt } from '../../ai/manager';
import TextStreamContainer from '../../textstream';

interface AIChatContentProps {
  history: Prompt[];
  isLoading: boolean;
  isStreaming?: boolean;
  apiError: string | null;
  onOperationSuccess: (response: any) => void;
  onOperationFailure: (error: any, operationType: string, resourceInfo?: any) => void;
  onYamlAction: (yaml: string, title: string, type: string, isDeleteOp: boolean) => void;
}

export default function AIChatContent({
  history,
  isLoading,
  isStreaming = false,
  apiError,
  onOperationSuccess,
  onOperationFailure,
  onYamlAction,
}: AIChatContentProps) {
  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {apiError && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small">
              <Link
                routeName="pluginDetails"
                params={{
                  name: '@headlamp-k8s/ai-assistant',
                }}
              >
                Settings
              </Link>
            </Button>
          }
        >
          {apiError}
        </Alert>
      )}

      <TextStreamContainer
        history={history}
        isLoading={isLoading}
        isStreaming={isStreaming}
        apiError={apiError}
        onOperationSuccess={onOperationSuccess}
        onOperationFailure={onOperationFailure}
        onYamlAction={onYamlAction}
      />
    </Box>
  );
}
